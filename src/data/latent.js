import utility from '@/utility'

export default class {
  constructor (latent, id = utility.getId()) {
    this.id = id
    this.latent = latent
  }
}
