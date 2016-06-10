const ary = require('lodash/ary');
const mapValues = require('lodash/mapValues');
const { overrides } = require('src/utils');


const project = ({id}) => ({url: `/projects/${id}`});


const dialogue = ({id}) => ({url: `/dialogues/${id}`});


const channel = ({id}) => ({url: `/channels/${id}`});


const provider = ({id}) => ({url: `/providers/${id}`});


const team = ({id}) => ({url: `/teams/${id}`});


module.exports = mapValues({
  project,
  dialogue,
  channel,
  provider,
  team
}, ary(overrides, 1));
