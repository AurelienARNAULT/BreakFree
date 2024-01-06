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
            // Charger la présence ou non des objets
            Debug.Log("HasKey");
            SetChambreOpen(PlayerPrefs.GetInt("ChambreOpen", 2) != 1);

            // Charger la scène
            // SceneManager.LoadScene(2);
        }
        else
        {
            // Aucune information trouvée dans PlayerPrefs, définir un état initial
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
        // Définir un état initial pour l'objet
        if (this.gameObject != null)
        {
            // Par exemple, activer l'objet par défaut
            this.gameObject.SetActive(true);
        }
    }
}
