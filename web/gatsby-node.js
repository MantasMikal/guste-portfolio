const { format } = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === 'SanityPosty') {
//     const slug = 'POOP'
//     console.log('SLUG: ', slug)

//     createNodeField({
//       node,
//       name: 'next',
//       value: slug
//     })
//   }
// }

async function createBlogPostPages (graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          previous {
            publishedAt
            slug {
              current
            }
          }
          next {
            publishedAt
            slug {
              current
            }
          }
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges.forEach((edge, index) => {
    const { id, slug = {}, publishedAt } = edge.node
    const dateSegment = format(publishedAt, 'YYYY/MM')
    const path = `/blog/${dateSegment}/${slug.current}/`

    // Next and previous pages
    const prevDate = edge.previous ? format(edge.previous.publishedAt, 'YYYY/MM') : null
    const nextDate = edge.next ? format(edge.next.publishedAt, 'YYYY/MM') : null

    const prev = edge.previous ? `/blog/${prevDate}/${edge.previous.slug.current}/` : null
    const next = edge.next ? `/blog/${nextDate}/${edge.next.slug.current}/` : null

    reporter.info(`Creating blog post page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/blogPostTemplate.js'),
      context: { id, prev, next }
    })

    createPageDependency({ path, nodeId: id })
  })
}

async function createProjectPages (graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          previous {
            slug {
              current
            }
          }
          next {
            slug {
              current
            }
          }
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/project/${slug}/`

    // Next and previous pages
    const prev = edge.previous ? `/project/${edge.previous.slug.current}/` : null
    const next = edge.next ? `/project/${edge.next.slug.current}/` : null
    reporter.info(`Creating project page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/projectTemplate.js'),
      context: { id, next, prev }
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)
}
