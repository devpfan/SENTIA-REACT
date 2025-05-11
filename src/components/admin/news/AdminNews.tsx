
import { NewsHeader } from "./header/NewsHeader";
import { NewsTableContainer } from "./table/NewsTableContainer";
import { CreateEditNewsModal } from "./CreateEditNewsModal";
import { useNewsManagement } from "./hooks/useNewsManagement";

export function AdminNews() {
  const {
    news,
    isLoading,
    isError,
    refetch,
    isModalOpen,
    selectedNews,
    handleCreateNews,
    handleEditNews,
    handleDeleteNews,
    handleCloseModal,
    handleSaveNews
  } = useNewsManagement();

  return (
    <div className="space-y-4">
      <NewsHeader onCreateNews={handleCreateNews} />
      
      <NewsTableContainer 
        news={news}
        isLoading={isLoading}
        isError={isError}
        onRefetch={refetch}
        onEdit={handleEditNews}
        onDelete={handleDeleteNews}
      />

      <CreateEditNewsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveNews} 
        initialData={selectedNews} 
      />
    </div>
  );
}
