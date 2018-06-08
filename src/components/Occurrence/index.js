import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import { Modal } from "../Buttons";
import MyOccurrence from './MyOccurrence';

// const NewOccurrence = (props) => {
//   let { ctx } = props;

//   const validateInput = (e) => {
//     const isBlank = (str) => (!str || /^\s*$/.test(str));

//     e.target.classList.toggle('is-danger', isBlank(e.target.value));
//     if (!isBlank(e.target.value)) {
//       this.setState({ [e.target.name]: e.target.value })
//     }
//   }

//   const handleModal = (mod) => {
//     this.setState({ showModal: mod })
//   }

//   return (
//     // <Modal
//     //   handleModal={handleModal.bind(ctx)}
//     //   show={showModal}
//     //   title="Nova Ocorrência em:"
//     //   onSubmit={ctx.saveData.bind(ctx)}
//     // >
//     //   <h1>{occurrence.name}</h1>
//     //   <hr />
//     //   <div className="control">
//     //     <input name="reference" className="input" placeholder="Ponto de refencia" style={style.input} type="text" onChange={validateInput.bind(ctx)} />
//     //     <textarea name="description" className="textarea" placeholder="Descricao" style={style.input} onChange={validateInput.bind(ctx)} />
//     //     <div style={style.input} className="select">
//     //       <select name="type" style={style.select} onChange={validateInput.bind(ctx)}>
//     //         <option value="">Selecionar tipo da Ocorrência</option>
//     //         {types.map((type, idx) => (
//     //           <option key={idx} value={idx}>{type}</option>
//     //         ))}
//     //       </select>
//     //     </div>
//     //   </div>
//     // </Modal>

//   );
// }

const Occurrence = (props) => {
  const { show } = props;
  return (
    <Fragment>
      {
        show ? <MyOccurrence {...props} /> : ''
      }

      {/* <NewOccurrence/> */}
    </Fragment>
  );
};

Occurrence.propTypes = {
  show: PropTypes.bool,
};

export {
  Occurrence,
};