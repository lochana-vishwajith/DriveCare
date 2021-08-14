import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import "./officerDetailsDisplay.css";
import DataGrid, {
  Popup,
  Form,
  Editing,
  Scrolling,
  Paging,
  Column,
  HeaderFilter,
} from "devextreme-react/data-grid";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import axios from "axios";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";

const notesEditorOptions = { height: 60 };

const dataSource = AspNetData.createStore({
  key: "_id",
  loadUrl: "http://localhost:9000/trafficOfficer",
});

export default class officerDetailsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officerDetails: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:9000/trafficOfficer").then((res) => {
      console.log("res : ", res);
      this.setState({ officerDetails: res.data });
    });
  }
  render() {
    return (
      <div className="container">
        <div className="officerDetailsDisplay">
          <label className="OfficerDetaisDis">
            <h2>
              <b>Traffic Officer Details</b>
            </h2>
          </label>
          <hr />
          <Grid>
            <Paper elevation={20}>
              <DataGrid
                elementAttr={{
                  id: "gridContainer",
                }}
                dataSource={dataSource}
                showBorders={true}
                remoteOperations={true}
                wordWrapEnabled={true}
              >
                <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowAdding={true}
                  allowDeleting={true}
                >
                  <Popup
                    title="Traffic Officer Information"
                    showTitle={true}
                    width={700}
                    height={345}
                  />
                  <Form>
                    <Item itemType="group" colCount={2} colSpan={2}>
                      <Item dataField="firstName" caption="First Name" />
                      <Item dataField="lastName" caption="Last Name" />
                      <Item
                        dataField="nameInitial"
                        caption="Name with intials"
                      />
                      <Item dataField="nic" caption="NIC" />
                      <Item dataField="dob" caption="Date Of Birth" />
                      <Item
                        dataField="officerReg"
                        caption="Officer Reg.No"
                        disabled={true}
                      />
                      <Item dataField="mobile" caption="Mobile No" />
                      <Item dataField="home" caption="Home No" />
                    </Item>
                  </Form>
                </Editing>
                <Scrolling mode="virtual" rowRenderingMode="virtual" />
                <Paging defaultPageSize={200} />
                <HeaderFilter visible={true} allowSearch={true} />

                <Column dataField="_id" width={75} visible={false} />
                <Column
                  dataField="firstName"
                  caption="First Name"
                  width={150}
                />
                <Column dataField="lastName" caption="Last Name" width={120} />
                <Column dataField="nameInitial" caption="Name with intials" />

                <Column dataField="nic" caption="NIC" />
                <Column
                  dataField="dob"
                  caption="Date Of Birth"
                  dataType="date"
                  format="yyyy-MM-dd"
                  width={100}
                />
                <Column dataField="officerReg" caption="Officer Reg.No" />
                <Column dataField="mobile" caption="Mobile No" width={100} />
                <Column dataField="home" caption="Home No" width={100} />
              </DataGrid>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
