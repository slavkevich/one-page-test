function range() {
    var rangeInput = $('.input-range__input').val();
    $('.input-range__input').css({
        'background':'-webkit-linear-gradient(left, #e8e8e8 0%, #8986c3 '+ rangeInput +'%,  #e8e8e8 '+ rangeInput +'%, #e8e8e8 100%)'
    })
};


// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
                burgerMenu.classList.toggle("close");
                overlay.classList.toggle("overlay");
                bodyLock.classList.toggle("fixed");
            });
        });
    };
    scrollTo();
}());


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.header__link').forEach((link) => {
          link.classList.toggle('active', 
            link.getAttribute('href').replace('#', '') === entry.target.id
          );
        });
      }
    });
  }, {
    threshold: 1
  })
  
  document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section)
  })


var burgerMenu = document.getElementById('burger-menu');
var overlay = document.getElementById('menu');
var bodyLock = document.querySelector('html');
burgerMenu.addEventListener('click',function(){
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
  bodyLock.classList.toggle("fixed");
});
