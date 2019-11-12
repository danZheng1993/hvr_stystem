import Toast from 'react-native-root-toast';


// Add a Toast on screen.
export default toast = (message) => {
        Toast.show(message, {
        duration: 500,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
// setTimeout(function () {
//     Toast.hide(toast);
// }, 500);