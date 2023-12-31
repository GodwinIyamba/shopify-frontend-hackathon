// TOGGLE BUTTONS
const notificationBtn = document.querySelector('.notification-icon');
const profileBtn = document.querySelector('.profile-detail');
const closeAlertBtn = document.querySelector('.alert-icon');
const closeMobileAlertBtn = document.querySelector('.alert-icon-mobile');
const upArrowBtn = document.querySelector('.up-arrow');
const downArrowBtn = document.querySelector('.down-arrow');
const accordions = document.querySelectorAll('.accordion');
const accordionHeaders = document.getElementsByClassName('check-header');
const checkBorderFulls = document.getElementsByClassName('check-border-full');
const checkRotates = document.getElementsByClassName('check-rotate');
const checkTicks = document.getElementsByClassName('check-tick');
const progressBar = document.querySelector('.progress-bar');
const progressDetails = document.querySelector('.progress-details');

//DROPDOWNS
const notificationDropdown = document.querySelector('.notification-dropdown');
const profileDropdown = document.querySelector('.profile-dropdown');
const alertSection = document.querySelector('.alert');
const accordionContainer = document.querySelector('.accordion-container');

//EVENT LISTENERRS
notificationBtn.addEventListener('click', showNotificationDropdown);
profileBtn.addEventListener('click', showProfileDropdown);
closeAlertBtn.addEventListener('click', closeAlert);
closeMobileAlertBtn.addEventListener('click', closeMobileAlert);
upArrowBtn.addEventListener('click', closeAccordionContainer);
downArrowBtn.addEventListener('click', openAccordionContainer);
profileDropdown.addEventListener('keydown', handleDropdownNavigation);

for(let accordionHeader of accordionHeaders) {
    accordionHeader.addEventListener('click', () => {
        toggleAccordion(accordionHeader); 
    });
};

for(let checkBorderFull of checkBorderFulls) {
    checkBorderFull.addEventListener('mouseenter', () => {
        removeDashedBorder(checkBorderFull);
    })
}

for(let checkBorderFull of checkBorderFulls) {
    checkBorderFull.addEventListener('mouseleave', () => {
        addDashedBorder(checkBorderFull);
    })
}

for (let checkBorderFull of checkBorderFulls) {
    checkBorderFull.addEventListener('click', () => {
        showCheckRotateTick(checkBorderFull);
    })
}

for (let checkTick of checkTicks) {
    checkTick.addEventListener('click', () => {
        removeCheckTick(checkTick);
    })
}

document.addEventListener('click', (e) => {
    outsideNotificationDropdown(e);
    outsideProfileDropdown(e);
});

//LISTENER FUNCTIONS
function showNotificationDropdown() {
    if(notificationDropdown.classList.contains('show')) {    
        notificationDropdown.classList.remove('show');
    } else {
        notificationDropdown.classList.add('show');

        let firstFocusableElement = notificationDropdown.querySelector('span');

        firstFocusableElement.focus();
    }
}

function showProfileDropdown(){

    const expanded = profileBtn.getAttribute('aria-expanded') === 'true';
  
    profileBtn.setAttribute('aria-expanded', !expanded);

    if(profileDropdown.classList.contains('show')) {    
        profileDropdown.classList.remove('show');
    } else {
        profileDropdown.classList.add('show');

        let firstFocusableElement = profileDropdown.querySelector('a');
    
        firstFocusableElement.focus();
    }  
}

function outsideNotificationDropdown(e) {

    let notificationSvg = document.querySelector('.bell');

    if(e.target.parentElement === notificationBtn || e.target === notificationSvg || e.target === notificationBtn) {
        return;
    }
   
    if(notificationDropdown.classList.contains('show') && e.target !== notificationDropdown){
        notificationDropdown.classList.remove('show');
    } 
}

function outsideProfileDropdown(e) {
    let profileName = document.querySelector('.profile-name');
    let profileInitials = document.querySelector('.profile-initials');

    if(e.target.parentElement === profileBtn || e.target === profileName || e.target === profileInitials || e.target === profileBtn) {
        return;
    }

    if(profileDropdown.classList.contains('show') && e.target !== profileDropdown){
        profileDropdown.classList.remove('show');
    } 
}

function closeAlert(e) {
    e.stopPropagation();

    if(alertSection.classList.contains('invisible')) {    
        alertSection.classList.remove('invisible');
    } else {
        alertSection.classList.add('invisible');
    }
}

function closeMobileAlert(e) {
    e.stopPropagation();

    if(alertSection.classList.contains('invisible')) {    
        alertSection.classList.remove('invisible');
    } else {
        alertSection.classList.add('invisible');
    }
}

function closeAccordionContainer(e){
    e.stopPropagation();

    if(!accordionContainer.classList.contains('hide') ) {    
        accordionContainer.classList.add('hide');
        upArrowBtn.classList.add('hide')
        downArrowBtn.classList.remove('hide')
    }
}

function openAccordionContainer(e){
    e.stopPropagation();

    if(accordionContainer.classList.contains('hide')) {    
        accordionContainer.classList.remove('hide');
        upArrowBtn.classList.remove('hide')
        downArrowBtn.classList.add('hide')
    }
}

function toggleAccordion(accordionHeader) {
    let accordionContainer = accordionHeader.parentElement.parentElement.parentElement;

    if(accordionContainer.classList.contains('collapsed')) {  
        for(let currentAccordionHeader of accordionHeaders) {
            let currentAccordionContainer = currentAccordionHeader.parentElement.parentElement.parentElement;

            if(!currentAccordionContainer.classList.contains('collapsed')) {
                currentAccordionContainer.classList.add('collapsed');
            }
        };

        accordionContainer.classList.remove('collapsed');
    } 
}

function removeDashedBorder(checkBorderFull) {
    let checkCircle = checkBorderFull.querySelector('circle');
    checkCircle.removeAttribute('stroke-dasharray')
}

function addDashedBorder(checkBorderFull) {
    let checkCircle = checkBorderFull.querySelector('circle');
    checkCircle.setAttribute('stroke-dasharray', "4 6")
}

function showCheckRotateTick(checkBorderFull) {
    checkBorderFull.classList.add('hide');

    let checkRotate = checkBorderFull.nextElementSibling;

    let accordion = checkRotate.parentElement.parentElement.parentElement.parentElement;

    checkRotate.classList.add('check-rotate-active');

    setTimeout(() => {
        checkRotate.classList.remove('check-rotate-active');
        checkRotate.nextElementSibling.classList.add('check-tick-active');
        accordion.setAttribute('aria-checked', 'true');

        for(let checkTick of checkTicks) {
            let currentAccordion = checkTick.parentElement.parentElement.parentElement.parentElement;

            if(!currentAccordion.classList.contains('collapsed')) {
                currentAccordion.classList.add('collapsed');
            }
        }
      }, 600);

    let section = 100 / checkTicks.length;
    let progressBarWidth = section;
    let activeAccordionCount = 1;

    for(let checkTick of checkTicks) {
        if(checkTick.classList.contains('check-tick-active')){
            progressBarWidth += section;
            activeAccordionCount++
        }
    }

    setTimeout(() => {
        progressDetails.innerText = activeAccordionCount + ' / ' + checkTicks.length + ' completed';
        progressBar.removeAttribute('style');
        progressBar.setAttribute('style','width:' + progressBarWidth + '%;');

        accordion.classList.add('collapsed');

        function criteria(element){
            if(element !== null ) {
                if(!element.hasAttribute('aria-checked')) {
                    return true;
                }
            } 
        }

        function checkNextSiblings(element, criteriaFn) {

            if(!element || !element.nextElementSibling) {
              return; 
            }
          
            if(criteriaFn(element.nextElementSibling)) {
              return element.nextElementSibling;
            } 
            
            return checkNextSiblings(element.nextElementSibling, criteriaFn);
          
        }

        function checkPreviousSiblings(element, criteriaFn) {

            if(!element || !element.previousElementSibling) {
              return; 
            }
        
            if(criteriaFn(element.previousElementSibling)) {
              return element.previousElementSibling;
            } 
            
            return checkPreviousSiblings(element.previousElementSibling, criteriaFn);
          
        }

        let nextSibling = checkNextSiblings(accordion, criteria)

        if(nextSibling){
            nextSibling.classList.remove('collapsed');
        } else {
            let previousSibling = checkPreviousSiblings(accordion, criteria)

            previousSibling.classList.remove('collapsed')
        }

      }, 600);
} 

function removeCheckTick(checkTick) {
    checkTick.classList.remove('check-tick-active');

    let checkRotate = checkTick.previousElementSibling;

    let accordion = checkRotate.parentElement.parentElement.parentElement.parentElement;

    checkRotate.previousElementSibling.classList.remove('hide')

    accordion.removeAttribute('aria-checked');

    let section = 100 / checkTicks.length;
    let activeAccordionCount = 0;
    
    for(let checkTick of checkTicks) {
        if(checkTick.classList.contains('check-tick-active')){
            activeAccordionCount++;
        }
    }

    let progressBarWidth = section * activeAccordionCount;

    progressDetails.innerText = activeAccordionCount + ' / ' + checkTicks.length + ' completed';

    progressBar.removeAttribute('style');
    progressBar.setAttribute('style','width:' + progressBarWidth + '%;');
}

function handleDropdownNavigation(event) {
    if (event.key === 'Escape') {
        // Close the dropdown on 'Escape' key
        profileDropdown.classList.remove('show');
        dropdownButton.setAttribute('aria-expanded', 'false');
        dropdownButton.focus(); // Return focus to the dropdown button
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        // Handle arrow key navigation within the dropdown
        event.preventDefault();
        var focusableItems = profileDropdown.querySelectorAll('a');
        var currentIndex = Array.from(focusableItems).indexOf(document.activeElement);
        var nextIndex = event.key === 'ArrowDown' ? (currentIndex + 1) % focusableItems.length : (currentIndex - 1 + focusableItems.length) % focusableItems.length;

        focusableItems[nextIndex].focus();
    }
}