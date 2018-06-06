import Component, { tracked } from '@glimmer/component';


export default class StrategicVotingUi extends Component {
    private BASE_URL = 'https://6nyzcbc290.execute-api.ca-central-1.amazonaws.com/prod/notford';

    @tracked
    private vote: any;

    public whoToVote() {
        let postalcode = document.getElementById('postalcode').value;
        fetch(`${this.BASE_URL}/${postalcode}`)
            .then((response) => response.json())
            .then(({ vote }) => this.vote = vote);
    }
}
