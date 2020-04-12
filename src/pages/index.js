import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SliceZone from "../components/sliceZone"

export const query = graphql`
{
  prismic {
    allHomepages {
      edges {
        node {
          body {
            ... on PRISMIC_HomepageBodyHero {
              type
              primary {
                hero_content
                hero_title
                background_image
              }
            }
            ... on PRISMIC_HomepageBodyCall_to_action_grid {
              type
              fields {
                button_destination {
                  ... on PRISMIC_Page {
                    page_title
                    content
                    _meta {
                      uid
                    }
                  }
                }
                button_label
                call_to_action_title
                content
                featured_image
              }
              primary {
                section_title
              }
            }
            ... on PRISMIC_HomepageBodyPrice_list {
              type
              primary {
                title
              }
              fields {
                price_list_description
                price_list_title
                price_per_month
                price_type
              }
            }
          }
        }
      }
    }
  }
}
`

const IndexPage = (props) => {
  console.log(props)
  return (  
  <Layout>
    <SliceZone body={props.data.prismic.allHomepages.edges[0].node.body} />
  </Layout>
  )
}

export default IndexPage
