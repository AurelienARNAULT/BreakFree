using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderChambre : MonoBehaviour
{

    void Start()
    {
        LoadSavedScene();
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("ChambreOpen"))
        {
            SetChambreOpen(PlayerPrefs.GetInt("ChambreOpen", 2) != 1);
        }
        else
        {
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
        if (this.gameObject != null)
        {
            this.gameObject.SetActive(true);
        }
    }
}
