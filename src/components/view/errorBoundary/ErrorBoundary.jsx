import { Card } from "primereact/card";
import React from "react";
import "./ErrorBoundary.css";
import { Message } from "primereact/message";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";
import UpdateModelService from "../../../services/model/UpdateModelService";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: {
        visible: false,
        message: "",
      },
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: {
        visible: true.valueOf,
        message: error,
      },
    });
  }

  updateModelService = new UpdateModelService();

  render() {
    if (this.state.hasError.visible) {
      return (
        <Card
          title={
            <div className="flex">
              <i
                className=" pi pi-times-circle my-auto m-2"
                style={{ fontSize: "1.5em" }}
              />
              <div className="my-auto">Błąd systemu</div>
            </div>
          }
          className="error-boundary-title-card m-4"
        >
          <div className="flex mb-4">
            <Message
              severity="error"
              text={this.state.hasError.message.toString()}
            />
            <PrimaryButton
              icon="pi pi-refresh"
              label="Wyczyść bazę wiedzy"
              className="ml-3"
              onClick={() => {
                this.updateModelService.clearKnowledgeBaseAndMetrics();
                this.setState(() => ({
                  hasError: {
                    visible: false,
                    message: null,
                  },
                }));
              }}
            />
          </div>
          <div>{`${this.state.hasError.message.stack}`}</div>
        </Card>
      );
    }

    return this.props.children;
  }
}
