import { DocumentCard } from '../document-card';

export default function DocumentCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <DocumentCard
        title="Employee Handbook 2025"
        category="HR"
        uploadDate="Jan 1, 2025"
        fileSize="2.4 MB"
        testId="doc-handbook"
      />
    </div>
  );
}
