const slides = [
  [
    m( 'h1', m.trust( 'Ember &amp; me' ) )
  ]
]

let slide      = 0

let resolution = undefined
let buffer     = ''

window.addEventListener( 'keydown', ( { key, which } ) => {
  if( which > 36 && which < 41 )
    slide = Math.max( 0,
      Math.min( slides.length,
        slide + ( which > 38 ? 1 : -1 )
      )
    )

  else if( typeof parseInt( key ) === 'number' ){
    buffer += key

    clearTimeout( resolution )

    resolution = setTimeout( () => {
      slide = parseInt( buffer )

      buffer = ''
    }, 300 )
  }
  else
    return

  m.redraw()
} )

m.mount( document.body, {
  view : () =>
    m( 'article', {
      style : {
        transform : `translateY( ${ -slide * 100 }vh )`
      }
    },
      slides.map( ( content, index ) =>
        m( 'section', {
          style : { left : index * 100 + 'vw' }
        },
          m( 'main',
            content
          )
        )
      )
    )
} )
