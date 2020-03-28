<style lang="scss">
.match {
    font-weight: bold;
}

.secondary {
    font-size: 0.9rem;
    color: $body-text;

    &:before {
        padding: 0px $space--x-small;
        content: '-';
        display: inline-block;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Place } from '../services/sdk.interface';

type MatchedSubstrings = google.maps.places.PredictionSubstring[];
interface ISubstring {
    matched: boolean;
    text: string;
}

@Component
export default class PlaceHighlighter extends Vue {
    @Prop(Object)
    place!: Place;

    @Prop({
        type: Boolean,
        default: false,
    })
    secondary!: boolean;

    @Prop({
        type: String,
        default: 'div',
    })
    tag!: string;

    coverAllSubstrings(text: string, matches: MatchedSubstrings) {
        let posCovered = 0;
        const sections: ISubstring[] = [];

        for (const { offset, length } of matches) {
            if (offset !== posCovered) {
                sections.push({
                    matched: false,
                    text: text.substring(posCovered, posCovered+offset),
                });
            }

            sections.push({ matched: true, text: text.substring(offset, offset+length)})

            posCovered = offset + length;
        }

        if (posCovered !== text.length) {
            sections.push({
                matched: false,
                text: text.substring(posCovered, text.length),
            });
        }

        return sections;
    }

    render(h: Vue['$createElement']) {
        const {
            main_text: mainText,
            main_text_matched_substrings: matches,
            secondary_text: secondaryText,
            secondary_text_matched_substrings: secondaryMatches,
        } = this.place.structured_formatting;

        return h(this.tag, {
            on: {
                click: () => this.$emit('click')
            }
        }, [
            this.coverAllSubstrings(mainText, matches || []).map(({ text, matched }, i) => {
                return h('span',  { key: `substr-${i}`, attrs: { class: matched ? 'match' : '' } }, text)
            }),

            this.secondary ? h('span', { attrs: { class: 'secondary' }}, this.coverAllSubstrings(secondaryText, secondaryMatches || []).map(({ text, matched }, i) => {
                return h('span',  { key: `substr-${i}`, attrs: { class: matched ? 'match' : '' } }, text)
            })) : undefined,
        ]);
    }
}
</script>
