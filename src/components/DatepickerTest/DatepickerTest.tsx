import moment, { Moment } from "moment";
import * as React from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatepickerTest.css";

import Inputmask from "inputmask";

interface IProps {}

interface IState {
  selectedDate: Moment | null;
}

export default class DatepickerTest extends React.Component<IProps, IState> {
  static convertInputValToMoment = (e: any) =>
    moment(
      e.currentTarget.value === ""
        ? null
        : e.currentTarget.value.replace(/_/g, "0"),
      "HH:mm:ss"
    );

  state: IState = {
    selectedDate: null
  };

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const dp = document.getElementById("dp");
    console.log(dp);
    const mask = new Inputmask({
      regex: "([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
    });
    mask.mask(dp);
  }

  printSelectedDate = () =>
    this.state.selectedDate
      ? this.state.selectedDate.format("HH:mm:ss")
      : "No date selected";

  handleChange = (selectedDate: moment.Moment | null, event: any) => {
    console.log("On change!", event);

    this.setState({ selectedDate });

    if (!selectedDate) {
      return;
    }
    const dp = document.getElementById("dp") as HTMLInputElement;
    setTimeout(() => (dp.value = this.printSelectedDate()), 100);
  };

  handleKeyDown = (e: any & KeyboardEvent) => {
    console.log("Keydown!", e);

    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.value.trim() === "") {
        return;
      }
      this.handleChange(DatepickerTest.convertInputValToMoment(e), null);
    }
  };

  handleBlur = (e: any) => {
    console.log("Blur", e);

    if (e.currentTarget.value.trim() === "") {
      e.preventDefault();
      return;
    }

    this.handleChange(DatepickerTest.convertInputValToMoment(e), null);
  };

  render() {
    return (
      <fieldset>
        <h1>Datepicker test</h1>
        <h4>
          Selected date: <span>{this.printSelectedDate()}</span>
        </h4>
        <Datepicker
          id="dp"
          selected={this.state.selectedDate}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          dateFormat="HH:mm:ss"
          timeFormat="HH:mm"
          utcOffset={0}
          showTimeSelectOnly={true}
          showTimeSelect={true}
          timeIntervals={10}
          adjustDateOnChange={false}
          disabledKeyboardNavigation={true}
        />
      </fieldset>
    );
  }
}
