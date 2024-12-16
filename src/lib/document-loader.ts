import { JsonLdDocumentLoader } from "jsonld-document-loader";
import { JSONLD_CONTEXTS } from "./contexts";

const loader = new JsonLdDocumentLoader();
loader.addDocuments({ documents: JSONLD_CONTEXTS });

const documentLoader = loader.build();

export default documentLoader;
