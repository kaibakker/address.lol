import PropTypes from 'prop-types'
import React from 'react'
import { Label } from 'semantic-ui-react'

import SearchExampleCategory from './SearchExampleCategory'

const categoryRenderer = ({ name }) => <Label as={'span'} content={name} />

categoryRenderer.propTypes = {
  name: PropTypes.string,
}

const resultRenderer = ({ name, url }) => <a href={url} > {name}</a>

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
}

const SearchForm = () => (
  <SearchExampleCategory
    categoryRenderer={categoryRenderer}
    resultRenderer={resultRenderer}
  />
)

export default SearchForm
