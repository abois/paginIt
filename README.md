paginIt
=======

A light jQuery plugin for pagination

Usage
-----
In the `head` you need :

```html
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="../src/paginit.js"></script>
    <script>
    $(document).ready(function () {
        $('#book').paginIt();
    });
    </script>
```

For example:

```html
    <section id="book">
      <article data-title="Chapter 1">
        <header>Chapter 1</header>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis sollicitudin ligula ac blandit. Quisque sit amet volutpat erat. In in nulla eu nisi consectetur porttitor eu pellentesque augue. Cras elementum elit id nibh rutrum accumsan. Cras sollicitudin, est ac tincidunt porta, libero mi molestie orci, eu tristique leo neque et odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla tortor adipiscing felis convallis, sed feugiat nibh eleifend. Cras eu purus turpis. Suspendisse sed fermentum est, sit amet bibendum libero. Fusce sapien tortor, condimentum eleifend sapien non, tempus varius leo.

Nam sollicitudin tortor a turpis viverra, sit amet faucibus ligula accumsan. Nulla vitae dui vulputate, convallis nulla sed, hendrerit velit. Sed sit amet ligula nec risus facilisis blandit a sed nunc. Sed euismod elementum enim, in suscipit nulla adipiscing sed. Pellentesque in sagittis nisl, id dictum odio. Maecenas sodales lacus sit amet nisl placerat, id lobortis arcu tempor. Phasellus nec dignissim orci, condimentum aliquam nisi. Duis cursus nisi in sapien facilisis, sed venenatis quam sodales. Donec et neque ac ante tempus aliquet sit amet vitae arcu. In facilisis dolor eget molestie commodo. Etiam tempus nisl at mauris vulputate, sed pharetra velit adipiscing. Duis nec molestie massa.</p>
      </article>
      <article data-title="Chapter 2">
        <header>Chapter 2</header>
        <p>Fusce vitae luctus lorem. Morbi non erat vehicula, mattis turpis a, consequat diam. Cras sit amet nisi nec justo venenatis mollis vitae ut justo. Sed ornare ligula massa, sed rhoncus urna tempus quis. Praesent vel gravida dui, sed convallis dui. Suspendisse scelerisque odio in nibh feugiat, a ultrices ipsum consectetur. Nam gravida tellus sed nunc ullamcorper porttitor. Maecenas scelerisque dictum nulla, id convallis urna vulputate et. Etiam quis volutpat lectus.

In convallis commodo justo at tincidunt. Integer vel turpis vitae ipsum vestibulum dictum. Suspendisse id turpis sit amet mauris aliquet mattis congue et libero. Donec ligula magna, tincidunt in lorem ut, ornare faucibus leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla enim risus, malesuada scelerisque imperdiet dapibus, bibendum ac sapien. Pellentesque vel arcu lacus. Maecenas vehicula blandit leo et vehicula. Nullam tellus dui, malesuada a mauris ut, consequat molestie metus. Mauris egestas sapien id ullamcorper tincidunt. Aliquam lacinia molestie diam, sit amet dictum mi blandit ut. Phasellus consequat, metus in scelerisque gravida, augue urna aliquet enim, a ornare nisi diam ut turpis. Maecenas a nisi cursus, feugiat magna nec, facilisis lorem. Cras consequat malesuada felis ut fringilla.</p>
      </article>
      <article data-title="Chapter 3">
        <header>Chapter 3</header>
        <p>Aenean tincidunt magna a dui accumsan, quis convallis enim faucibus. Fusce hendrerit, diam non blandit ullamcorper, nisl turpis sodales nunc, vitae porttitor nisi nibh sed nulla. Donec at dolor eget massa egestas posuere a eget risus. Donec purus erat, laoreet vitae laoreet non, viverra non metus. Sed hendrerit tortor eget massa dictum viverra. Sed pellentesque sapien in justo ullamcorper, luctus mollis quam feugiat. Curabitur molestie iaculis dolor sed eleifend. Morbi sit amet massa in eros tincidunt aliquam.</p>
      </article>
    </section>
```
The `data-title` attribute is used to display the pages title in the navigator.

Options
-------
 
  * `matchingElement`
    - The elements to match for pagination
    - default: `'article'`
   
  * ``width``
   - The elements width
   - default: `'800'`
   
  * ``prevContent``
   - The prev button html content
   - default: `'&lt;'`
   
  * ``nextContent``
   - The next button html content
   - default: `'&gt;'`
   
  * ``cssPrefix``
   - The prefix for css classes
   - default: `'paginit-'`
   
  * ``effectDuration``
   - The show effect duration
   - default: `0`

Example:

```js
    $(document).ready(function () {
        $('#book').paginIt({
            matchingElement: $('[data-title]'), //or '[data-title]'
            effectDuration: 250,
            nextContent: '> next',
            prevContent: '< prev',
            width: 300,
            cssPrefix: 'book-'
        });
    });
```
