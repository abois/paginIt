paginIt
=======

A light jQuery plugin for pagination

Usage
-----

```html
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="../src/paginit.js"></script>
    <script>
    $(document).ready(function () {
        $('#book').paginIt();
    });
    </script>
```
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

