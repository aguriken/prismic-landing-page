/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components';
import "./layout.css"

const MainWrapper = styled.main`
  margin: 0 auto;
`

const navigationQuery = graphql`
{
  prismic {
    allNavigations {
      edges {
        node {
          branding
          navigation_links {
            label
            link {
              ... on PRISMIC_Contact_page {
                _meta {
                  uid
                }
              }
              ... on PRISMIC_Page {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
  }
}
`

const Header = styled.header`
  display: flex;
  background: black;
  height: 66px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Branding = styled.div`
a{
  color: orange;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}
  color: orange;
  font-weight: bold;
  margin: auto 0;
  font-size: 20px;
`;

const Navlinks = styled.div`
  margin-left: auto;
  display: flex;
`;

const Navlink = styled.div`
  margin: auto 0;
  a{
    color: white;
    padding: 0 16px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;

    &:hover{
      color: orange;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <StaticQuery 
          query={`${navigationQuery}`} 
          render={(data) => {
            // console.log(data)
            return (
              <>
                <Branding>
                <Link to="/">
                  {data.prismic.allNavigations.edges[0].node.branding}
                </Link>
                </Branding>
                <Navlinks>
                  {data.prismic.allNavigations.edges[0].node.navigation_links.map((link) => {
                    return (
                      <Navlink key={link.link._meta.uid}>
                        <Link to={`/${link.link._meta.uid}`}>
                          {link.label}
                        </Link>
                      </Navlink>
                    )
                  })}
                </Navlinks>
              </>
              )
          }}
        />
      </Header>
      <MainWrapper>{children}</MainWrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
