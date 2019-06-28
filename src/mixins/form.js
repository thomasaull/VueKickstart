import find from 'lodash/find'
import ValidForm from '@pageclip/valid-form'

export default {
  methods: {
    formInitValidator(form) {
      ValidForm(form, {
        invalidClass: 'is-danger',
        errorPlacement: 'after',
        validationErrorClass: 'Input-error'
      })
    },

    formHasErrors(form) {
      const error = find(form.querySelectorAll('input'), input => {
        return input.validity.valid !== true
      })

      if (error) {
        // console.log('has errors')
        return true
      }

      // console.log('no errors')
      return false
    }
  }
}
