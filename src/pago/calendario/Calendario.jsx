import { Component } from "react";
import "./calendario.css";

export default class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDates: [],
            startDate: null,
            endDate: null,
            total: 0
        };
    }

    handleDateClick(date) {
        const { startDate, endDate } = this.state;
        
        if (!startDate || (startDate && endDate)) {
            this.setState({ startDate: date, endDate: null, selectedDates: [date], total: this.props.price });
        } else {
            const range = this.generateRange(startDate, date);
            this.setState({
                endDate: date,
                selectedDates: range,
                total: range.length * this.props.price
            });
        }
    }

    generateRange(start, end) {
        const range = [];
        const startDate = Math.min(start, end);
        const endDate = Math.max(start, end);

        for (let i = startDate; i <= endDate; i++) {
            range.push(i);
        }

        return range;
    }

    render() {
        const days = Array.from({ length: 30 }, (_, i) => i + 1);
        
        return (
            <div className="Calendario">
                <h3>¿Cuántos días va a estar?</h3>
                <div className="calendarioGrid">
                    {days.map((day) => (
                        <button
                            key={day}
                            className={`dia ${this.state.selectedDates.includes(day) ? "seleccionado" : ""}`}
                            onClick={() => this.handleDateClick(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <div className="totalReservar">
                    <p className="total">Total: <span style={{ color: "#4a90e2" }}>${this.state.total}</span></p>
                </div>
            </div>
        );
    }
}
