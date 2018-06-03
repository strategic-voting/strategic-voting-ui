import Component from '@glimmer/component';

export default class StrategicVotingUi extends Component {
    private speakers = ['Tom', 'Yehuda', 'Ed'];
    private data = fetch('https://6nyzcbc290.execute-api.ca-central-1.amazonaws.com/prod/notford/l4j')
        .then(function(response) {
            console.log(response.json());
        });
}
