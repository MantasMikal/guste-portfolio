import React from 'react'
import Grid from '../components/grid/grid'
import Video from '../components/video/video'
import BlockContent from '../components/block-content'
import Img from '../components/image/zoomableImage'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'
const cfg = { projectId: 'ee0lu4ue', dataset: 'production' }

export function makeMediaComponent (component) {
  switch (component._type) {
  case 'figure':
    if (!component || !component.asset || !component.asset.mimeType) {
      console.log('Could not create figure component, because asset is invalid', component.asset)
      return // Safety
    }

    const image = component.asset
    const imageAlt = component.alt ? component.alt : ' '
    // Determine if it is a gif and render aproprietly

    if (image.mimeType === 'image/gif') {
      return (
        <img src={image.url} alt={imageAlt} style={{ width: '100%' }} key={component.asset.id} />
      )
    } else {
      const fluidProps = image.fluid
        ? image.fluid
        : getFluidGatsbyImage(image._id, { maxWidth: 1920, maxHeight: 1200 }, cfg)
      const isZoomable = component.isZoomable
      return (
        <Img fluid={fluidProps} alt={imageAlt} key={component.asset.id} isZoomable={isZoomable} />
      )
    }

  case 'video':
    if (!component || !component.asset || !component.asset.url) {
      console.log('Could not create video component, because it is invalid', component.asset)
      return // Safety
    }

    const video = component.asset.url
    const videoAlt = component.alt ? component.alt : ' '
    // const videoCaption = component.caption ? component.caption : " "
    return <Video src={video} alt={videoAlt} key={component.asset.id} />

  case 'contentBlock':
    const maxWidth = component.maxWidth ? component.maxWidth : 100
    return (
      <div style={{ maxWidth: `${maxWidth}%` }} key={component._key}>
        <BlockContent blocks={component.contentBlock} />
      </div>
    )

  default:
    console.log(component._type, ' does not exist!')
    console.log('COMPONENT:', component)
    return <div>Missing component</div>
  }
}

export function makeGrid (component) {
  const gridMedia = component.gridMedia
  const colCount = component.colCount
  // Build content
  const gridComponents = gridMedia.map(item => {
    return makeMediaComponent(item)
  })
  return (
    <Grid colCount={colCount} key={component._key}>
      {gridComponents}
    </Grid>
  )
}

export function makeComponents (components) {
  if (!components) {
    return <> </>
  }
  return components.map(component => {
    switch (component._type) {
    case 'grid':
      return makeGrid(component)
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
