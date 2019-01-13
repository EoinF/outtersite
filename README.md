# Outtersite

The static html and css for my website at https://outterest.com

I am actively avoiding the use of javascript to see how much can be accomplished without it.

Expanding and collapsing content is achieved using `div:target` and `div:not(:target)`.
The former is active when the id of one of its parents is in the hash of the url. The
latter is active in all other cases.
