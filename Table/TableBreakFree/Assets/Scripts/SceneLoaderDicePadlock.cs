using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderDicePadlock : MonoBehaviour
{

    //GameObject ObjectPaint;

    void Start()
    {
        LoadSavedScene();

        //ObjectPaint = this.gameObject;
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("DicePresentInPadlock"))
        {
            // Charger la pr�sence ou non des objets
            Debug.Log("HasKey");
            SetObjectPresence(PlayerPrefs.GetInt("DicePresentInPadlock", 2) == 2);

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
            this.gameObject.SetActive(false);
        }
    }
}
