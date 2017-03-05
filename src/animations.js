export default {
    animations: [
        {
            // call this transition with <transistion-attack>HTML TO TRANSITION</transition-attack>
            tag: 'transition-attack',
            // We don't want to trigger the transition on initial render
            onAppear: false,
            // Ignore CSS animations that happen to have the same name
            css: false,
            // Define the animation hooks
            events: {
                // Always start hidden
                beforeEnter: function (el) {
                    el.style.opacity = 0
                },
                // Move the text up when it appears in .4s, then hide it in .2s
                afterEnter: function (el) {
                    Velocity(el, {opacity: 1, translateY: '-40px'}, {duration: 400})
                    Velocity(el, {opacity: 0}, {duration: 200})
                }
            }
        }
    ],
    register(vue){
        // Loop over the defined animations
        this.animations.forEach((animation) => {

            // Register each animation as a component
            vue.component(animation.tag, {
                functional: true,

                // Render a transition tag, assign the animation methods
                render(createElement, context){
                    // Assign element props and register events
                    const data = {
                        props: {
                            name: animation.tag,
                            mode: 'out-in',
                            appear: (typeof animation.onAppear == 'undefined') ? false : animation.onAppear,
                            css: (typeof animation.css == 'undefined') ? true : animation.css
                        },
                        on: animation.events
                    }
                    // Render the element
                    return createElement('transition', data, context.children)
                }
            })
        })
    }
};