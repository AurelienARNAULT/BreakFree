using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderKey : MonoBehaviour
{

    //GameObject ObjectPaint;

    void Start()
    {
        LoadSavedScene();
        //ObjectPaint = this.gameObject;
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("KeyPresent"))
        {
            // Charger la pr�sence ou non des objets
            Debug.Log("HasKey");
            SetObjectPresence(PlayerPrefs.GetInt("KeyPresent", 2) != 1);

            // Charger la sc�ne
            // SceneManager.LoadScene(2);
        }
        else
        {
            // Aucune information trouv�e dans PlayerPrefs, d�finir un �tat initial
            // Vous pouvez ajuster cette logique selon votre besoin
            Debug.Log("SetInitial");
            SetInitialObjectState();
        }
    }

    void SetObjectPresence(bool isPresent)
    {
        Debug.Log(isPresent);

        this.gameObject.SetActive(isPresent);
    }

    void SetInitialObjectState()
    {
        // D�finir un �tat initial pour l'objet
        if (this.gameObject != null)
        {
            // Par exemple, activer l'objet par d�faut
            this.gameObject.SetActive(true);
        }
    }
}
