import React from 'react'
import Grid from '../components/grid/grid'
import Video from '../components/video/video'

import Img from '../components/image/image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'

const cfg = { projectId: 'ee0lu4ue', dataset: 'production' }

export function makeMediaComponent (component) {
  switch (component._type) {
  case 'figure':
    if (!component || !component.asset || !component.asset.mimeType) {
      console.log('Could not create component, because it is invalid', component.asset)
      return // Safety
    }

    const image = component.asset
    const imageAlt = component.alt ? component.alt : ' '
    // Determine if it is a gif and render aproprietly

    if (image.mimeType === 'image/gif') {
      return <img src={image.url} alt={imageAlt} style={{ width: '100%' }} key={component._key} />
    } else {
      const fluidProps = getFluidGatsbyImage(image._id, { maxWidth: 1920 }, cfg)
      return <Img fluid={fluidProps} alt={imageAlt} key={component._key} />
    }

  case 'video':
    if (!component || !component.asset || !component.asset.url) {
      console.log('Could not create component, because it is invalid', component.asset)
      return // Safety
    }

    const video = component.asset.url
    const videoAlt = component.alt ? component.alt : ' '
    // const videoCaption = component.caption ? component.caption : " "
    return <Video src={video} alt={videoAlt} key={component._key} />

  default:
    console.log(component._type, ' does not exist!')
    console.log('COMPONENT:', component)
    return <div>Missing component</div>
  }
}

export function makeComponents (components) {
  if (!components) {
    return <> </>
  }
  return components.map(component => {
    switch (component._type) {
    case 'grid':
      const gridMedia = component.gridMedia
      const colCount = component.colCount
      const gridComponents = gridMedia.map(item => {
        return makeMediaComponent(item)
      })
      // console.log('Grid Components: ', gridComponents)
      return (
        <Grid key={component._key} colCount={colCount}>
          {gridComponents}
        </Grid>
      )

    case 'figure':
      return makeMediaComponent(component)
    case 'video':
      return makeMediaComponent(component)
    default:
      console.log(component._type, ' does not exist!')
      return <div>Missing component</div>
    }
  })
}
