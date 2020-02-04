import React, { useState } from "react";
import ReactExport from "react-export-excel";

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportCSVButton = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <button className="btn btn-secondary" onClick={handleClick}>
      CSV
    </button>
  );
};

const CopyButton = props => {
  let stringToCopy = "";
  props.headings.forEach(heading => (stringToCopy += heading.text + "\t"));

  props.data.forEach(row => {
    stringToCopy = stringToCopy.trim() + "\n";
    stringToCopy += row.id + "\t";
    stringToCopy += row.titleName + "\t";
    stringToCopy += row.distributorName + "\t";
    stringToCopy += row.weekendRev + "\t";
    stringToCopy += row.locs + "\t";
    stringToCopy += row.locAvg + "\t";
    stringToCopy += row.cumeRev;
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() => {
          navigator.clipboard.writeText(stringToCopy);
          showModal();
          setTimeout(hideModal, 1000);
        }}
      >
        Copy
      </button>

      <Modal show={isOpen} onHide={hideModal}>
        <ModalHeader>
          <ModalTitle className="clipboard">Copy to clipboard</ModalTitle>
        </ModalHeader>
        <ModalBody className="clipboard_text">
          Copied 12 rows to clipboard
        </ModalBody>
      </Modal>
    </>
  );
};

const ExportExcelButton = props => {
  return (
    <ExcelFile element={<button className="btn btn-secondary">Excel</button>}>
      <ExcelSheet data={props.data} name="Box Office List">
        <ExcelColumn label="#" value="id" />
        <ExcelColumn label="Title" value="titleName" />
        <ExcelColumn label="Distributor Name" value="distributorName" />

        <ExcelColumn label="Weekend Total" value="weekendRev" />
        <ExcelColumn label="# of Locs" value="locs" />

        <ExcelColumn label="Loc Avg" value="locAvg" />
        <ExcelColumn label="Cume Total" value="cumeRev" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export { ExportCSVButton, ExportExcelButton, CopyButton };
