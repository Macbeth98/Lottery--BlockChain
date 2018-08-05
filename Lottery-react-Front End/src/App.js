import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction Success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been Entered!" });

    window.alert("You have been Entered!");

    window.location.reload();
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction...." });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const Winner = await lottery.methods.winner().call();

    //window.location.reload();

    this.setState({ message: "A winner has been picked! " + Winner });

    window.alert("Winner of  the Lottery:" + Winner);

    window.location.reload();
  };

  render() {
    // console.log(web3.version);
    // web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This Contract is managed by <b>{this.state.manager}</b>. There are
          currently <b>{this.state.players.length} people</b> entered to win the
          lottery of amount{" "}
          <b> {web3.utils.fromWei(this.state.balance, "ether")} </b> ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Yo!</h4>
          <div>
            <label>Amount of ether to Enter </label>
            <br />
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <br />
          <button>Enter</button>
        </form>
        <hr />
        <h4>Pick a Winner!!</h4>
        <button onClick={this.onClick}>Pick Winner!</button>
        <hr />
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default App;
