import S from '@sanity/desk-tool/structure-builder'
import MdFace from 'react-icons/lib/md/face'
import MdSettings from 'react-icons/lib/md/settings'
import MdPanorama from 'react-icons/lib/md/panorama'
import MdSubject from 'react-icons/lib/md/subject'
import FaFileO from 'react-icons/lib/fa/file-o'
import MdImage from 'react-icons/lib/fa/image'
// import MdImportContacts from 'react-icons/lib/fa/importContacts'
const hiddenTypes = [
  'category',
  'personalInfo',
  'page',
  'person',
  'post',
  'project',
  'siteSettings',
  'illustrations',
  'project',
  'category',
  'person',
  'aboutPage',
  'customerServicePage'
]

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Personal Info')
        .child(
          S.editor()
            .id('personalInfo')
            .schemaType('personalInfo')
            .documentId('personalInfo')
        )
        .icon(MdFace),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project'))
        .icon(MdPanorama),
      S.listItem()
        .title('Illustrations')
        .schemaType('illustrations')
        .child(S.documentTypeList('illustrations'))
        .icon(MdImage),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts'))
        .icon(MdSubject),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About')
                .child(
                  S.editor()
                    .id('aboutPage')
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                )
                .icon(FaFileO),
              S.listItem()
                .title('Contact')
                .child(
                  S.editor()
                    .id('contactPage')
                    .schemaType('page')
                    .documentId('contact')
                )
                .icon(FaFileO),
                S.listItem()
                .title('Customer Service')
                .child(
                  S.editor()
                    .id('customerServicePage')
                    .schemaType('customerServicePage')
                    .documentId('customerServicePage')
                )
                .icon(FaFileO)
            ])
        ),
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
    ])
