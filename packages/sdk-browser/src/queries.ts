export const APP_ENV_USER = `
query ApplicationEnvironmentUser ($meta: ApplicationEnvironmentSelectorInput!) {
  applicationEnvironmentUser(meta: $meta) {
    user{
      id
      externalId
      userName
      displayName
      nickName
      profileUrl
      title
      userType
      preferredLanguage
      locale
      createdAt
      updatedAt
      photos {
        id
        value
        type
      }
    }
  }
}
`;
