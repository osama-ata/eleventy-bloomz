---
applyTo: "**/*.md, **/*.njk, **/*.js"
---

## Front Matter

```
---

title: Test
date: '2021-08-04'
layout: layouts/entry.njk

---
```

This is a page is for testing and showcasing the markdown styles in this template.

## Markdown

(some escape chars `\` are added to ensure raw display)

### WikiRefs

#### A Prefixed WikiAttr (see attrbox for output)

```markdown
:prefixed-wikiattr::[[wikirefs]]
```

:prefixed-wikiattr::[[wikirefs]]

#### A Prefixed WikiAttr List (see attrbox for output)

```markdown
: prefixed-wikiattr-list ::

- [[wikirefs]]
- [[feedback]]
```

: prefixed-wikiattr-list ::

- [[wikirefs]]
- [[feedback]]

#### An Unprefixed WikiAttr (see attrbox for render)

```markdown
unprefixed-wikiattr::[[wikirefs]]
```

unprefixed-wikiattr::[[wikirefs]]

#### An Unprefixed WikiAttr List (see attrbox for render)

```markdown
unprefixed-wikiattr-list ::

- [[wikirefs]]
- [[feedback]]
```

unprefixed-wikiattr-list ::

- [[wikirefs]]
- [[feedback]]

#### A WikiLink

```markdown
[[digital-garden]]
```

[[digital-garden]]

#### A Typed WikiLink (check html for linktype css class)

```markdown
:typed-wikilink::[[digital-garden]].
```

:typed-wikilink::[[digital-garden]].

#### A WikiEmbed (Markdown)

```markdown
![[test-render]]
```

![[test-render]]

#### A WikiEmbed (Image)

```markdown
![[wikibonsai-way.png]]
```

![[wikibonsai-way.png]]

#### Zombies

#### A Prefixed WikiAttr (see attrbox for render)

```markdown
:zombie-wikiattr::[[zombie]]
```

:zombie-wikiattr::[[zombie]]

#### A Prefixed WikiAttr List (see attrbox for render)

```markdown
: zombie-wikiattr-list ::

- [[zombie-1]]
- [[zombie-2]]
```

: zombie-wikiattr-list ::

- [[zombie-1]]
- [[zombie-2]]

#### An Unprefixed WikiAttr (see attrbox for render)

```markdown
zombie-wikiattr::[[zombie]]
```

zombie-wikiattr::[[zombie]]

#### An Unprefixed WikiAttr List (see attrbox for render)

```markdown
zombie-wikiattr-list ::

- [[zombie-1]]
- [[zombie-2]]
```

zombie-wikiattr-list ::

- [[zombie-1]]
- [[zombie-2]]

#### A WikiLink

```markdown
[[zombie]]
```

[[zombie]]

#### A Typed WikiLink

```markdown
:zombie-typed-wikilink::[[zombie]].
```

:zombie-typed-wikilink::[[zombie]].

#### A WikiEmbed

```markdown
![[zombie]]
```

![[zombie]]

#### Headers

```markdown
# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6
```

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

#### Lists

```markdown
Lists:

- One
- Two
- Three
```

Lists:

- One
- Two
- Three

#### Blockquote

```markdown
> Blockquote.
```

> Blockquote.

#### Weblink

```markdown
[Weblink](https://contracts-wiki.osamata.com)
```

[Weblink](https://contracts-wiki.osamata.com)

#### Code Block:

`````markdown
````javascript
// javascript
for (var i=1; i < 101; i++){
    if (i % 15 == 0) console.log("FizzBuzz");
    else if (i % 3 == 0) console.log("Fizz");
    else if (i % 5 == 0) console.log("Buzz");
    else console.log(i);
}
\```
```ruby
# ruby
 1.upto 100 do |i|
  string = ""
  string += "Fizz" if i % 3 == 0
  string += "Buzz" if i % 5 == 0
  puts "#{i} = #{string}"
end
\```
````
`````

````

```javascript
// javascript
for (var i = 1; i < 101; i++) {
  if (i % 15 == 0) console.log("FizzBuzz");
  else if (i % 3 == 0) console.log("Fizz");
  else if (i % 5 == 0) console.log("Buzz");
  else console.log(i);
}
```

```ruby
# ruby
 1.upto 100 do |i|
  string = ""
  string += "Fizz" if i % 3 == 0
  string += "Buzz" if i % 5 == 0
  puts "#{i} = #{string}"
end
```

#### Inline Code

```markdown
Alright, `alright`, alright.
```

Alright, `alright`, alright.

#### Tables

```markdown
| Rabbits | Foxes | Hedgehogs |
| :------ | :---: | --------: |
| 25      |   3   |        12 |
| 100     |  10   |        20 |
```

| Rabbits | Foxes | Hedgehogs |
| :------ | :---: | --------: |
| 25      |   3   |        12 |
| 100     |  10   |        20 |

#### Text

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```
````
