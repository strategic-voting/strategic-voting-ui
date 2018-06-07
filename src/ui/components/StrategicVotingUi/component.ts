import Component, { tracked } from '@glimmer/component';


export default class StrategicVotingUi extends Component {
    private BASE_URL = 'https://6nyzcbc290.execute-api.ca-central-1.amazonaws.com/prod/notford';

    @tracked
    private riding: any;

    @tracked
    private candidate: any;

    @tracked
    private vote: any;

    @tracked
    private socialMediaText = encodeURI("Now I know who'll best defeat Doug Ford. "
        + "I'm voting strategically in this election, you can too! #NotFord #onelxn #onpoli.");

    public whoToVote() {
        let postalcode = document.getElementById('postalcode').value;
        let postalCodeNoWhitespace = postalcode.replace(/\s+/, '');
        fetch(`${this.BASE_URL}/${postalCodeNoWhitespace}`)
            .then((response) => response.json())
            .then(({ vote, riding }) => {
                this.riding = riding;
                this.vote = vote;
                this.showRiding();
            });
    }

    private candidateToVoteFor(candidates, party) {
        let partyToCandidate = this.candidatesKeyOnParty(candidates);
        return partyToCandidate[party];
    }

    private candidatesKeyOnParty(candidates) {
        let parties = {};
        candidates.forEach((candidate) => {
            parties[candidate.party] = candidate.name;
        });
        return parties;
    }

    private showRiding() {
        document.getElementById('ridinginfo').className += ' showRiding';
    }
}
