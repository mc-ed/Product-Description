import React from "react";

function Specifications(props) {
  const { backgroundColor } = props.style.lowesMedBackground;
  return (
    <div className="card">
      <div
        style={{ backgroundColor, cursor: "pointer" }}
        className="card-header"
        id="headingTwo"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <span className="iconFont">M </span>
        <span className="text-white font-weight-bold">Specifications</span>
        <span className="float-right iconFont">Z</span>
      </div>

      <div
        id="collapseTwo"
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div className="row">
            <div className="col">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="bg-light font-weight-bold" scope="row">
                      Spec 1
                    </th>
                    <td>Spec 1 Value</td>
                  </tr>
                  <tr>
                    <th className="bg-light font-weight-bold" scope="row">
                      Spec 2
                    </th>
                    <td>Spec 2 Value</td>
                  </tr>
                  <tr>
                    <th className="bg-light font-weight-bold" scope="row">
                      Spec 3
                    </th>
                    <td>Spec 3 Value</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="bg-light font-weight-bold" scope="row">
                      Spec 4
                    </th>
                    <td>Spec 4 Value</td>
                  </tr>
                  <tr>
                    <th className="bg-light font-weight-bold" scope="row">
                      Spec 5
                    </th>
                    <td>Spec 5 Value</td>
                  </tr>
                  <tr>
                    <th className="bg-light font-weight-bold" scope="row">
                      Spec 6
                    </th>
                    <td>Spec 6 Value</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specifications;
