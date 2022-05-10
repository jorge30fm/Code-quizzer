var questionBank = {
        question1: ''
};

var landingContent = document.querySelector('#landing-page');
landingContent.addEventListener('click', hideContent);

//hide landing page content when user clicks start quiz button
function hideContent(event){
        var targetEl = event.target;
        if (targetEl.matches('#start-button')) {
                var displaySetting = landingContent.style.display;
                if (displaySetting === 'block'){
                        landingContent.style.display = 'none';
                }

        }
}