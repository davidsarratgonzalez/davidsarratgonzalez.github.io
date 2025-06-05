import imagesConfig from '../data/images-config.json';

// Create a reverse mapping from logo filename to organization key
const createLogoMap = () => {
  const logoMap = {};
  const organizations = imagesConfig.logos.organizations;
  
  Object.entries(organizations).forEach(([orgKey, config]) => {
    logoMap[config.source] = orgKey;
  });
  
  return logoMap;
};

export const logoFilenameToKey = createLogoMap();

// Get organization key from logo filename
export const getOrgKeyFromFilename = (filename) => {
  return logoFilenameToKey[filename] || null;
};

// Check if an organization logo exists in config
export const hasOrgLogo = (orgKey) => {
  return imagesConfig.logos.organizations[orgKey] !== undefined;
};

// Get organization config
export const getOrgConfig = (orgKey) => {
  return imagesConfig.logos.organizations[orgKey] || null;
}; 