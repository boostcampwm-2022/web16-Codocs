import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentResponseDTO } from './dto/document-response.dto';

describe('DocumentController', () => {
  let documentController: DocumentController;
  let documentService: DocumentService;

  beforeEach(() => {
    documentService = new DocumentService(null, null, null, null);
    documentController = new DocumentController(documentService);
  });

  describe('list', () => {
    it('should return an array of Document', async () => {
      const result = new DocumentResponseDTO();
      result.id = 'test';
      result.title = 'test';
      jest.spyOn(documentService, 'list').mockResolvedValue([result]);

      expect(await documentController.list()).toEqual([result]);
    });
  });
});
