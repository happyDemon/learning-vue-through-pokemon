![Learning Vue.js through Pokemon](https://cdn-images-1.medium.com/max/2000/1*zUXn3MdnINFkEmqe92Nfcw.png)
# Learning Vue.js through Pokemon

This repo contains the code for my tutorial series '[Vue.js explained through Pokemon](https://medium.com/@maximkerstens/vue-js-explained-through-pokemon-ac49516ba5d3#.tp1jszxgb)'.

This is a continuation on [Vue.js Pokemon Battle tutorial](https://medium.com/coding-artist/vue-js-pokemon-battle-tutorial-380cd72eb681#.thudhql24) where I dig a little deeper and explain several other features that Vue.js offers.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Published articles

#### #1 Single file components
[Article](https://medium.com/@maximkerstens/vue-js-explained-through-pokemon-ac49516ba5d3#.tp1jszxgb) | [Branch](https://github.com/happyDemon/learning-vue-through-pokemon/tree/chapter-1)

This tutorial shows how to setup a work flow to use single file components,
splits the previous code base into 2 components and touches on computed properties.


#### #2 Attack functionality: $refs, Promisses & events
[Article](https://medium.com/@maximkerstens/vue-js-explained-through-pokemon-2-refs-promises-event-bus-79b705498f0#.kfotzu5wz) | [Promise based implementation](https://github.com/happyDemon/learning-vue-through-pokemon/tree/chapter-2-promisses) | [Event based implementation](https://github.com/happyDemon/learning-vue-through-pokemon/tree/chapter-2-events)

The second installment brings back the attack functionality.
2 different implementations are discussed to explain $refs, promises & events.

#### #3 Implementing Vuex
[Article](https://medium.com/@maximkerstens/vue-js-explained-through-pokemon-b4779c83b245#.6juxdzpc9) | [Branch](https://github.com/happyDemon/learning-vue-through-pokemon/tree/chapter-3)

In this tutorial we're separating our state into a global state store.

#### #4 Damage calculations
[Article](https://medium.com/@maximkerstens/vue-js-explained-through-pokemon-4-damage-calculations-a3065f0b1761#.twd8m3akg) | [Branch](https://github.com/happyDemon/learning-vue-through-pokemon/tree/chapter-4)

Traditional pokemon attack damage calculations gets discussed in this article, we implement this through a Damage class.

#### #5 Transition & animation
[Article](https://medium.com/@maximkerstens/vue-js-explained-through-pokemon-5-transitions-animation-7bfc70e01d3d#.2moivnuef) | [Branch](https://github.com/happyDemon/learning-vue-through-pokemon/tree/chapter-5)

Let's make use of Vue transition when pokemon appear/faint and add some textual info when an attack is, for example, super effective through resuable transition.

## Roadmap
**Note** This can always change in the future

 - Testing our components
 - Switching pokemon: vue-router
 - Expanding on attacks: status effects
 - Implementing items
