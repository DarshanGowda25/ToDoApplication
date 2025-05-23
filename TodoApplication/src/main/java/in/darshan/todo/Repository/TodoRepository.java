package in.darshan.todo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import in.darshan.todo.Entity.Todo;
import java.util.List;


@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {
	
	List<Todo> findByStatus(String status);
	
	@Modifying
	@Query("DELETE FROM Todo t WHERE t.status = :status")
	void deleteByStatus(String status);

}
