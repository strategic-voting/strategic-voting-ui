import Component, { tracked } from '@glimmer/component';


export default class StrategicVotingUi extends Component {
    private BASE_URL = 'https://6nyzcbc290.execute-api.ca-central-1.amazonaws.com/prod/notford';

    @tracked
    private riding: any;

    @tracked
    private candidate: any;

    @tracked
    private vote: any;

    public whoToVote() {
        let postalcode = document.getElementById('postalcode').value;
        let postalCodeNoWhitespace = postalcode.replace(/\s+/, '');
        fetch(`${this.BASE_URL}/${postalCodeNoWhitespace}`)
            .then((response) => response.json())
            .then(({ vote, candidates }) => {
                this.riding = candidates[0].riding;
                this.candidate = this.candidateToVoteFor(candidates, vote);
                this.vote = vote;
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
}
