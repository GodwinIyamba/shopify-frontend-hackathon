const notificationButton = document.getElementsByClassName('notification-icon');

console.log(notificationButton);

notificationButton.addEventListener('onclick', function(){
    notificationButton.getAttribute('class');

  console.log(classValue);
});