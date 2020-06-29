import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import Modal from 'react-native-modal';

// export default class ScoreModal extends Component {
//   state = {
//     isModalVisible: false,
//   };

//   toggleModal = () => {
//     this.setState({ isModalVisible: !this.state.isModalVisible });
//   };

//   render() {
//     const { score } = this.props;
//     return (
//       <View style={{ flex: 1 }}>
//         <Button title="Check Your Score" onPress={this.toggleModal} />
//         <Modal isVisible={this.state.isModalVisible}>
//           <View style={{ flex: 1 }}>
//             <Text>
//               {score < 60
//                 ? `Awww shucks, you got a ${
//                     score || 0
//                   }%. Better luck next time!`
//                 : `You've got some mad trivia skills! You got a ${score}%`}
//             </Text>
//             <Button title="Close" onPress={this.toggleModal} />
//           </View>
//         </Modal>
//       </View>
//     );
//   }
// }

// const ScoreModal = (props) => {
//   const { buttonLabel, className, score } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button color="info" onClick={toggle}>
//         {buttonLabel}
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>Trivia Score</ModalHeader>
//         <ModalBody>
//           {score < 60
//             ? `Awww shucks, you got a ${score || 0}%. Better luck next time!`
//             : `You've got some mad trivia skills! You got a ${score}%`}
//           .{' '}
//         </ModalBody>
//         <ModalFooter>
//           <NavLink to="/">
//             <Button color="primary" onClick={toggle}>
//               Back to Categories
//             </Button>
//           </NavLink>
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };
