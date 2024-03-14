/** Function for creating JSON link objects **/

export function createLinkObject(id) {
  const link = `{
      "en-US": {
          "sys": {
              "type": "Link",
              "linkType": "Entry",
              "id": "${id}"
          }
      }
    }`;
  return JSON.parse(link);
}

