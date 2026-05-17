import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import FileUpload from '~ui/app/components/FileUpload/index.vue'

describe('FileUpload', () => {
  it('renders label when provided', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload files' },
    })

    expect(wrapper.text()).toContain('Upload files')
  })

  it('renders dropzone by default', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload' },
    })

    expect(wrapper.text()).toContain(
      'Glissez & déposez des fichiers ici, ou cliquez pour parcourir',
    )
  })

  it('renders trigger instead of dropzone when dropzone is false', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', dropzone: false },
    })

    expect(wrapper.text()).toContain('Choisir des fichier(s)')
    expect(wrapper.text()).not.toContain(
      'Glissez & déposez des fichiers ici, ou cliquez pour parcourir',
    )
  })

  it('shows required indicator when required is true', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', required: true },
    })

    expect(wrapper.text()).toContain('*')
  })

  it('does not show clear trigger by default', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload' },
    })

    expect(wrapper.text()).not.toContain('Clear all')
  })

  it('shows clear trigger when clearable is true', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', clearable: true },
    })

    expect(wrapper.text()).toContain('Tout effacer')
  })

  it('uses custom clear text', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', clearable: true, clearText: 'Remove files' },
    })

    expect(wrapper.text()).toContain('Remove files')
  })

  it('applies disabled state', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', disabled: true },
    })

    const root = wrapper.find('[data-part="root"]')
    expect(root.attributes('data-disabled')).toBeDefined()
  })

  it('renders helper text when provided', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', helperText: 'Max 5 files allowed' },
    })

    expect(wrapper.text()).toContain('Max 5 files allowed')
  })

  it('exposes context via default slot', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload' },
      slots: {
        default: `
          <template #default="{ acceptedFiles, maxFilesReached }">
            <span data-testid="file-count">{{ acceptedFiles.length }}</span>
            <span data-testid="max-reached">{{ maxFilesReached }}</span>
          </template>
        `,
      },
    })

    expect(wrapper.find('[data-testid="file-count"]').text()).toBe('0')
    expect(wrapper.find('[data-testid="max-reached"]').text()).toBe('false')
  })

  it('uses custom dropzone text', async () => {
    const wrapper = await mountSuspended(FileUpload, {
      props: { label: 'Upload', dropzoneText: 'Custom dropzone message' },
    })

    expect(wrapper.text()).toContain('Custom dropzone message')
  })
})
