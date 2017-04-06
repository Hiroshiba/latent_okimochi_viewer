export default class {
  constructor (json) {
    this.apiUrl = json['api_url']
    this.queryName = json['query_name']
    this.latentShape = json['latent_shape']
  }
}
