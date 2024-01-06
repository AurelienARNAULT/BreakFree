using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderChambre : MonoBehaviour
{

    //GameObject ObjectPaint;

    void Start()
    {
        LoadSavedScene();
        //ObjectPaint = this.gameObject;
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("ChambreOpen"))
        {
            // Charger la pr�sence ou non des objets
            Debug.Log("HasKey");
            SetChambreOpen(PlayerPrefs.GetInt("ChambreOpen", 2) != 1);

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

    void SetChambreOpen(bool isOpen)
    {
        if (isOpen)
        {
            this.gameObject.tag = "ChambreCollider";
        }
        else
        {
            this.gameObject.tag = "PieceInterdite";
        }
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
