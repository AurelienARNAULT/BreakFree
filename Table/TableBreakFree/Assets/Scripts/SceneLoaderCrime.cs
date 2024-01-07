using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoaderCrime : MonoBehaviour
{
    void Start()
    {
        LoadSavedScene();
    }

    void LoadSavedScene()
    {
        if (PlayerPrefs.HasKey("CrimePresent"))
        {
            Debug.Log("HasKey");
            SetObjectPresence(PlayerPrefs.GetInt("CrimePresent", 2) != 1);
        }
        else
        {
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
        if (this.gameObject != null)
        {
            this.gameObject.SetActive(true);
        }
    }
}
