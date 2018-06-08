import React, { Component, Fragment } from 'react';
import { Modal } from '../Buttons';
import { loc } from '../../constants/config';
import { types } from '../../constants';
import PropTypes from 'prop-types';

class MyOccurrence extends Component {
  state = {
    occurrences: [],
  }

  handleModal = (mod) => {
    this.setState({ showModal: mod });
  }

  componentDidMount() {
    this.getOccurrences();
  }

  getOccurrences = async () => {
    let { user } = this.props;
    if (user && loc) {
      const occurrences = await loc.where('author', '==', user.uid)
        .get()
        .then((snap) => snap.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        }));
      this.setState({ occurrences });
    }
  }

  render() {

    return (
      <Modal
        handleModal={this.props.handle}
        show={this.props.show}
        title="Minhas Ocorrências"
      >
        <h1>sim</h1>
        {this.state.occurrences.map(occurrence => (
          <Fragment key={occurrence.id}>
            <h1>{occurrence.name}</h1>
            <p><b>Ponto Referencia:</b> {occurrence.reference}</p>
            <p><b>Descricao:</b> {occurrence.description}</p>
            <p><b>Tipo:</b> {types[occurrence.type]}</p>
            <hr/>
          </Fragment>
        ))}
      </Modal>
    );
  }
}

MyOccurrence.propTypes = {
  handle: PropTypes.func,
  show: PropTypes.bool,
};

export default MyOccurrence;